import {Icon} from 'assets/icons';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {PBox} from 'components/primitives/p-box';
import {PSearchCard} from 'components/primitives/p-search-card';
import {PTypo} from 'components/primitives/p-typo';
import {SearchResult} from 'types/api';

export const SectionMainM = ({
  totalSearchResults,
  searchResult,
}: {
  totalSearchResults?: any;
  searchResult?: SearchResult;
}) => {
  return (
    <CAdaptiveBox padding="16px 20px 40px" className="fade-in">
      <PBox
        display="grid"
        gridAutoFlow="column"
        justifyContent="start"
        alignItems="center"
        gap="7px"
        marginBottom="16px"
      >
        <PTypo variant="h2">Search results </PTypo>
        <PTypo variant="h2">({totalSearchResults || 0})</PTypo>
      </PBox>
      <PBox display="grid" gap="13px">
        {totalSearchResults !== 0 ? (
          <>
            {searchResult?.itemCollectionsTotalCount !== 0 &&
              searchResult?.itemCollections?.map(iC => (
                <PSearchCard
                  key={iC.id}
                  size="large"
                  device="mobile"
                  entity={iC}
                  url={`/search-result/collections/${iC.id}/items`}
                />
              ))}

            {searchResult?.marketItemsTotalCount !== 0 &&
              searchResult?.marketItems?.map(mI => (
                <PSearchCard
                  key={mI.id}
                  size="large"
                  device="mobile"
                  entity={mI}
                  url={`/search-result/items/view/${mI?.id}/${mI?.seller?.walletAddress}`}
                />
              ))}

            {searchResult?.usersTotalCount !== 0 &&
              searchResult?.users?.map(user => (
                <PSearchCard
                  key={user.id}
                  size="large"
                  device="mobile"
                  entity={user}
                  url={`/search-result/authors/${user.walletAddress}/collections`}
                />
              ))}
          </>
        ) : (
          <PBox padding="61px 16px" textAlign="center">
            <Icon.Find width={151} height={151} />
            <PBox maxWidth="319px" margin="19px auto 0" gap="6px" display="grid">
              <PTypo variant="h1" regular>
                Ouch!!!
              </PTypo>
              <PTypo variant="h2" regular>
                Sorry, we can’t come up with anything for your search. Try again.
              </PTypo>
            </PBox>
          </PBox>
        )}
      </PBox>
    </CAdaptiveBox>
  );
};
