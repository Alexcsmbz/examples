import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {RowM} from '../row';
import {Image} from 'assets/images';
import {PSidenav} from 'components/primitives/p-sidenav';
import {MyHistoryFilter} from '../filter';
import {Icon} from 'assets/icons';
import {theme} from 'constants/theme';
import {PageMyHistoryMProps} from '../../page-my-history.types';

export const SectionMainM = (props: PageMyHistoryMProps) => {
  return (
    <CAdaptiveBox display="grid" gridAutoFlow="row" className="fade-in" padding="16px 20px 40px" gap="20px">
      <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="center" gap="24px">
        <PTypo variant="h2">My history</PTypo>
        <PBox onClick={props.onFilterOpen}>
          <Icon.Filter />
        </PBox>
      </PBox>
      {props.transactions?.length !== 0 ? (
        <PBox>
          {props.transactions?.map(t => (
            <RowM key={t.hash} tx={t} />
          ))}
        </PBox>
      ) : (
        <PBox display="grid" justifyContent="center" textAlign="center" gap="24px" marginBottom="40px">
          <PBox>
            <img src={Image.dissatisfied} alt="" width={150} height={150} />
          </PBox>
          <PBox>
            <PTypo variant="h2">Ouch!!!</PTypo>
            <PTypo variant="h2" regular>
              You have not made any transactions yet
            </PTypo>
          </PBox>
        </PBox>
      )}

      <PSidenav active={props.filterOpen}>
        <PBox
          display="grid"
          gridTemplateRows="1fr auto"
          gap="25px 0"
          padding="15px 16px"
          position="relative"
          height="100%"
        >
          <PBox display="grid" alignContent="start" gap="25px 0">
            <PBox position="absolute" top="20px" right="20px" onClick={props.onFilterClose}>
              <Icon.Cross fill={theme.pallete.light.grey[900]} />
            </PBox>
            <PBox>
              <PBox marginBottom="8px">
                <PTypo variant="h2">Filters</PTypo>
              </PBox>
              <PBox display="grid" gap="15px">
                <MyHistoryFilter
                  control={props.formControl}
                  onFilterClose={props.onFilterClose}
                  onFilter={props.onFilter}
                />
              </PBox>
            </PBox>
          </PBox>
        </PBox>
      </PSidenav>
    </CAdaptiveBox>
  );
};
