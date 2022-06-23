import {useForm} from 'react-hook-form';
import {Icon} from 'assets/icons';
import {theme} from 'constants/theme';
import {PBox} from 'components/primitives/p-box';
import {PInput} from 'components/primitives/p-input';
import {PBackground} from 'components/primitives/p-background';
import {PSearchCard} from 'components/primitives/p-search-card';
import {PTypo} from 'components/primitives/p-typo';
import {searchInput, searchRoot, searchDirect, inputOffset} from './c-search.styles';
import {getSearchService} from 'services/app';
import {useRef, useState} from 'react';
import {SearchResult} from 'types/api';
import {debounce} from 'lodash';
import {useDispatch} from 'react-redux';
import {getSearchResultAction} from 'store/app/actions';
import {useNavigate} from 'react-router-dom';
import {useOutsideClick} from 'hooks/use-outside-click';
import {cx} from '@emotion/css';
import {PLoader} from 'components/primitives/p-loader';
import {Route} from 'constants/routes';
import {useCurrentDevice} from 'hooks';

export type FormSearchField = {
  query: string;
};

export const CSearch = ({onSearchClose}: {onSearchClose?: () => void}) => {
  const {desktop, tablet, mobile} = useCurrentDevice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<SearchResult>();
  const wrapperRef = useRef(null);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const {register, watch, handleSubmit} = useForm<FormSearchField>({
    defaultValues: {
      query: '',
    },
  });

  useOutsideClick(wrapperRef, () => {
    setSearchBarActive(false);
  });

  const handleSearch = debounce(
    handleSubmit(async data => {
      if (data.query !== '' && data.query.length >= 3) {
        try {
          const result = await getSearchService({searchString: data.query});

          setSearchData({
            itemCollections: result.data.itemCollections,
            itemCollectionsTotalCount: result.data.itemCollectionsTotalCount,
            marketItems: result.data.marketItems,
            marketItemsTotalCount: result.data.marketItemsTotalCount,
            users: result.data.users,
            usersTotalCount: result.data.usersTotalCount,
          });
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchData({});
      }
    }),
    1000
  );

  return (
    <PBox
      position="relative"
      className={searchRoot}
      boxShadow={searchBarActive && desktop ? theme.shadow[1] : ''}
      borderBottom={searchBarActive && (tablet || mobile) ? `1px solid ${theme.pallete.light.grey[200]}` : ''}
      height={tablet || mobile ? '100%' : ''}
      display="grid"
      alignItems="center"
      ref={wrapperRef}
    >
      <PBox padding={tablet || mobile ? '0 20px' : ''}>
        <PInput<FormSearchField>
          register={register}
          className={cx(searchBarActive && searchInput, (tablet || mobile) && inputOffset)}
          name="query"
          placeholder="Search"
          autoComplete="off"
          slotRight={
            loading ? (
              <PLoader size={16} />
            ) : (
              <PBox display="grid" gridAutoFlow="column">
                <button
                  className={searchDirect}
                  disabled={
                    watch('query') === '' ||
                    watch('query').length < 3 ||
                    (searchData?.itemCollections?.length === 0 &&
                      searchData?.marketItems?.length === 0 &&
                      searchData?.users?.length === 0)
                  }
                  onClick={() => {
                    dispatch(getSearchResultAction(searchData));
                    navigate(Route.searchResults.path);
                    setSearchBarActive(false);

                    watch('query').length >= 3 && onSearchClose && onSearchClose();
                  }}
                >
                  <Icon.Search />
                </button>
                {(tablet || mobile) && (
                  <PBox marginLeft="13px" onClick={onSearchClose}>
                    <Icon.Cross fill={theme.pallete.light.grey[900]} width={16} height={14} />
                  </PBox>
                )}
              </PBox>
            )
          }
          onChange={() => {
            setLoading(watch('query') !== '' && watch('query').length >= 3);
            handleSearch();
          }}
          onClick={() => {
            setSearchBarActive(true);
          }}
        />
      </PBox>

      {watch('query') !== '' && watch('query').length >= 3 && searchBarActive && (
        <PBox
          position={desktop ? 'absolute' : 'fixed'}
          top={desktop ? '48px' : '55px'}
          bottom={tablet || mobile ? '0' : ''}
          maxHeight={desktop ? '420px' : '100%'}
          zIndex={5}
          width="100%"
          overflow="auto"
          borderBottomLeftRadius={theme.radius.main}
          borderBottomRightRadius={theme.radius.main}
          boxShadow={theme.shadow[1]}
        >
          <PBackground backgroundColor={theme.pallete.light.common.white} minHeight="100%">
            {searchData?.itemCollectionsTotalCount !== 0 ||
            searchData?.marketItemsTotalCount !== 0 ||
            searchData?.usersTotalCount !== 0 ? (
              <>
                {searchData?.itemCollectionsTotalCount !== 0 &&
                  searchData?.itemCollections?.map(iC => (
                    <PSearchCard
                      key={iC.id}
                      entity={iC}
                      url={`/search-result/collections/${iC.id}/items`}
                      onClick={() => setSearchBarActive(false)}
                    />
                  ))}

                {searchData?.marketItemsTotalCount !== 0 &&
                  searchData?.marketItems?.map(mI => (
                    <PSearchCard
                      key={mI.id}
                      entity={mI}
                      url={`/search-result/items/view/${mI?.id}/${mI?.seller?.walletAddress}`}
                      onClick={() => setSearchBarActive(false)}
                    />
                  ))}

                {searchData?.usersTotalCount !== 0 &&
                  searchData?.users?.map(user => (
                    <PSearchCard
                      key={user.id}
                      entity={user}
                      url={`/search-result/authors/${user.walletAddress}/collections`}
                      onClick={() => setSearchBarActive(false)}
                    />
                  ))}
              </>
            ) : (
              <PBox padding="61px 16px" textAlign="center">
                <Icon.Find />
                <PBox maxWidth="70%" margin="19px auto 0" gap="6px" display="grid">
                  <PTypo variant="h2" regular>
                    Ouch!!!
                  </PTypo>
                  <PTypo regular> Sorry, we can’t come up with anything for your search. Try again.</PTypo>
                </PBox>
              </PBox>
            )}
          </PBackground>
        </PBox>
      )}
    </PBox>
  );
};
