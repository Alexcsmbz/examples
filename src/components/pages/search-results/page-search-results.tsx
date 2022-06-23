import {useSelector} from 'react-redux';
import {appSearchResultSelector, appTotalSearchResultsSelector} from 'store/app/selectors';
import {useCurrentDevice} from 'hooks';
import {SectionMainD, SectionMainM, SectionMainT} from './components/section-main';

export const PageSearchResults = () => {
  const {mobile, tablet, desktop} = useCurrentDevice();
  const searchResult = useSelector(appSearchResultSelector);
  const totalSearchResults = useSelector(appTotalSearchResultsSelector);

  return (
    <main>
      {mobile ? (
        <SectionMainM totalSearchResults={totalSearchResults} searchResult={searchResult} />
      ) : tablet ? (
        <SectionMainT totalSearchResults={totalSearchResults} searchResult={searchResult} />
      ) : desktop ? (
        <SectionMainD totalSearchResults={totalSearchResults} searchResult={searchResult} />
      ) : null}
    </main>
  );
};
