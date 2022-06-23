import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {HeadRow} from '../head-row';
import {RowD} from '../row';
import {Image} from 'assets/images';
import {MyHistoryFilter} from '../filter';
import {PageMyHistoryProps} from '../../page-my-history.types';

export const SectionMainD = (props: PageMyHistoryProps) => {
  return (
    <CAdaptiveBox
      display="grid"
      gridAutoFlow="row"
      className="fade-in"
      maxWidth="1260px"
      padding="0 30px 89px"
      gap="32px"
    >
      <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="start" gap="24px">
        <PTypo variant="h1">My history</PTypo>
        <PBox display="grid" gap="15px" gridTemplateColumns="180px 180px" justifyContent="end">
          <MyHistoryFilter onFilter={props.onFilter} control={props.formControl} />
        </PBox>
      </PBox>

      {props.transactions?.length !== 0 ? (
        <PBox>
          <HeadRow />
          {props.transactions?.map(t => (
            <RowD key={`${Math.floor(Math.random() * 100000)}-${t.created}`} tx={t} />
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
    </CAdaptiveBox>
  );
};
