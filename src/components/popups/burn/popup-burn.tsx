import {PopupBase} from '../base';
import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {memo} from 'react';
import {ABI_1155, ABI_721} from 'constants/abis';
import {useDispatch, useSelector} from 'react-redux';
import {NftToken, TokenType} from 'types/api';
import {useForm} from 'react-hook-form';
import {postNftTokenPendingService} from 'services/app';
import {useContract, useToast} from 'hooks';
import {useLocation, useNavigate} from 'react-router-dom';
import {Route} from 'constants/routes';
import {getNftTokensAction} from 'store/app/actions';
import {userAccountSelector} from 'store/user/selectors';
import {toastMessage} from 'constants/toast-message';
import {PInput} from 'components/primitives/p-input';
import {MAX_QUANTITY_TOKENS, MIN_QUANTITY_TOKENS} from 'constants/common';
import {parse} from 'utils/parse-from-numeric-input';
import {add10PercentsToGas} from 'utils/add-10-percents-to-gas';

type FormBurnFields = {
  quantity?: number | string;
};

const PopupBurn = ({onClose, itemEntity}: {onClose: () => void; itemEntity: NftToken}) => {
  const contract721 = useContract(itemEntity.contractAddress!, ABI_721);
  const contract1155 = useContract(itemEntity.contractAddress!, ABI_1155);
  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
  } = useForm<FormBurnFields>({
    defaultValues: {quantity: ''},
  });
  const dispatch = useDispatch();
  const {showPending, showError, showSuccess} = useToast();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {address} = useSelector(userAccountSelector);

  const burn = async (data: FormBurnFields) => {
    const formData = new FormData();
    formData.append('nftTokenId', itemEntity?.id!);

    let tx: any;

    if (itemEntity.tokenType === TokenType.ERC721) {
      const estimatedGasLimit = await contract721?.estimateGas['burn'](itemEntity.tokenId);

      tx = await contract721?.burn(itemEntity.tokenId, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
    }

    if (itemEntity.tokenType === TokenType.ERC1155) {
      const args = [itemEntity.tokenId, data.quantity?.toString()];
      const estimatedGasLimit = await contract1155?.estimateGas['burn'](...args);

      tx = await contract1155?.burn(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
    }

    formData.append('transactionHash', tx?.hash);

    await postNftTokenPendingService(formData);

    if (pathname.includes(Route.myCollections.path)) {
      //TODO: provide filters from page-my-collections else this dispatch reset them
      dispatch(
        getNftTokensAction(
          itemEntity.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.itemCollectionId
            ? {
                ownerAddress: address,
                itemCollectionId: itemEntity.nftTokenDetail?.nftTokenDetailOwners?.find(
                  o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                )?.itemCollectionId!,
              }
            : {ownerAddress: address, take: 200}
        )
      );
    } else {
      navigate(Route.myCollections.path);
    }

    await new Promise(resolve => {
      if (itemEntity.tokenType === TokenType.ERC721)
        contract721?.on('Burned', tokenId => {
          resolve(parseInt(tokenId).toString());
        });

      if (itemEntity.tokenType === TokenType.ERC1155)
        contract1155?.on('SingleBurned', tokenId => {
          resolve(parseInt(tokenId).toString());
        });
    });
  };

  const onSubmit = handleSubmit(async data => {
    onClose();
    showPending(toastMessage.pending.burn);

    try {
      await burn(data);
      showSuccess();
    } catch (e) {
      console.error(e);
      showError();
    }
  });

  return (
    <PopupBase
      onSubmit={onSubmit}
      imageSrc={itemEntity?.nftTokenDetail?.imageUri!}
      title="Burn item"
      onCrossClick={onClose}
      open
      buttons={{
        confirm: {
          name: 'Continue',
        },
        reject: {
          name: 'Cancel',
          onClick: onClose,
        },
      }}
    >
      <PBox display="grid" gap="12px">
        {itemEntity?.tokenType === TokenType.ERC1155 && (
          <PInput<FormBurnFields>
            control={control}
            errors={errors}
            name="quantity"
            numeric
            label="Number of copies"
            required
            onValueChange={values => {
              setValue('quantity', values.floatValue);
            }}
            rules={{
              required: 'Fill in required fields',
              min: {
                value: MIN_QUANTITY_TOKENS,
                message: `Number of copies must be more than ${MIN_QUANTITY_TOKENS}`,
              },
              validate: {
                max: v =>
                  parse(v) <= MAX_QUANTITY_TOKENS || `Number of copies must be less than ${MAX_QUANTITY_TOKENS}`,
                integer: v => Number.isInteger(parse(v)) || 'Number of copies must be an integer',
              },
            }}
            placeholder="0"
          />
        )}
        <PBox textAlign="center">
          <PTypo variant="h3">Do you want burn a token {itemEntity.nftTokenDetail?.name}?</PTypo>
        </PBox>
      </PBox>
    </PopupBase>
  );
};

export const PopupBurnMemoized = memo(PopupBurn);
