import {PBox} from 'components/primitives/p-box';
import {PInput} from 'components/primitives/p-input';
import {PTypo} from 'components/primitives/p-typo';
import {ABI_1155, ABI_721} from 'constants/abis';
import {MAX_QUANTITY_TOKENS, MIN_QUANTITY_TOKENS} from 'constants/common';
import {Route} from 'constants/routes';
import {toastMessage} from 'constants/toast-message';
import {ethers} from 'ethers';
import {useContract, useToast} from 'hooks';
import {memo} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {postNftTokenPendingService} from 'services/app';
import {getNftTokensAction} from 'store/app/actions';
import {userAccountSelector} from 'store/user/selectors';
import {NftToken, TokenType} from 'types/api';
import {add10PercentsToGas} from 'utils/add-10-percents-to-gas';
import {parse} from 'utils/parse-from-numeric-input';
import {PopupBase} from '../base';

export type FormTransferFields = {
  addressTo: string;
  quantity?: number | string;
};

const PopupTransfer = ({onClose, itemEntity}: {onClose: () => void; itemEntity: NftToken}) => {
  const contract721 = useContract(itemEntity?.contractAddress!, ABI_721);
  const contract1155 = useContract(itemEntity?.contractAddress!, ABI_1155);
  const {
    register,
    formState: {errors},
    handleSubmit,
    control,
    setValue,
  } = useForm<FormTransferFields>({
    defaultValues: {quantity: ''},
  });
  const {address} = useSelector(userAccountSelector);
  const {showPending, showError, showSuccess} = useToast();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transfer = async ({
    tokenId,
    addressFrom,
    addressTo,
    quantity,
  }: {
    tokenId?: string;
    addressFrom: string;
    addressTo: string;
    quantity?: string | number;
  }) => {
    let tx: any;

    const stateFormData = new FormData();
    stateFormData.append('nftTokenId', itemEntity?.id!);

    if (itemEntity.tokenType === TokenType.ERC721) {
      const args = [addressFrom, addressTo, tokenId];
      const estimatedGasLimit = await contract721?.estimateGas['safeTransferFrom'](...args);

      tx = await contract721?.safeTransferFrom(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
    }

    if (itemEntity.tokenType === TokenType.ERC1155) {
      const args = [addressFrom, addressTo, tokenId, quantity, '0x00'];
      const estimatedGasLimit = await contract1155?.estimateGas['safeTransferFrom'](...args);

      tx = await contract1155?.safeTransferFrom(...args, {gasLimit: add10PercentsToGas(estimatedGasLimit!)});
    }

    stateFormData.append('transactionHash', tx?.hash);

    await postNftTokenPendingService(stateFormData);

    if (pathname.includes(Route.myCollections.path)) {
      //TODO: provide filters from page-my-collections else this dispatch reset them
      dispatch(
        getNftTokensAction(
          itemEntity?.nftTokenDetail?.nftTokenDetailOwners?.find(
            o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
          )?.itemCollectionId
            ? {
                ownerAddress: address,
                itemCollectionId: itemEntity?.nftTokenDetail?.nftTokenDetailOwners?.find(
                  o => o.ownerAddress?.toLowerCase() === address?.toLowerCase()
                )?.itemCollectionId!,
              }
            : {ownerAddress: address}
        )
      );
    } else {
      navigate(Route.myCollections.path);
    }

    await new Promise(resolve => {
      if (itemEntity.tokenType === TokenType.ERC721)
        contract721?.on('Transfer', () => {
          resolve(null);
        });

      if (itemEntity.tokenType === TokenType.ERC1155) {
        contract1155?.on('TransferSingle', () => {
          resolve(null);
        });
      }
    });
  };

  const onSubmit = handleSubmit(async data => {
    onClose();
    showPending(toastMessage.pending.transfer);

    try {
      await transfer({
        tokenId: itemEntity?.tokenId!,
        addressFrom: address!,
        quantity: data.quantity?.toString(),
        addressTo: data.addressTo?.toString(),
      });
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
      title="Transfer"
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
      <>
        <PBox display="grid" gap="16px">
          <PInput<FormTransferFields>
            register={register}
            name="addressTo"
            rules={{
              validate: {
                address: (v: string) => ethers.utils.isAddress(v) || 'Please enter a valid address',
              },
              required: 'Fill in required fields',
            }}
            errors={errors}
            required
            label="Reciever address"
            placeholder="Not specified"
          />
          {itemEntity.tokenType === TokenType.ERC1155 && (
            <PInput<FormTransferFields>
              control={control}
              errors={errors}
              name="quantity"
              numeric
              label="Number of copies"
              required
              onValueChange={values => {
                setValue('quantity', values.floatValue!);
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
            <PTypo variant="h3">Do you want transfer a token {itemEntity.nftTokenDetail?.name}?</PTypo>
          </PBox>
        </PBox>
      </>
    </PopupBase>
  );
};

export const PopupTransferMemoized = memo(PopupTransfer);
