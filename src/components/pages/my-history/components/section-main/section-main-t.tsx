import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {RowT} from '../row';
import {Image} from 'assets/images';
import {MyHistoryFilter} from '../filter';
import {PageMyHistoryProps} from '../../page-my-history.types';

export const SectionMainT = (props: PageMyHistoryProps) => {
  return (
    <CAdaptiveBox display="grid" gridAutoFlow="row" padding="16px 20px 60px" gap="22px">
      <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="start" gap="24px">
        <PTypo variant="h2">My history</PTypo>
        <PBox display="grid" gap="15px" gridTemplateColumns="180px 180px" justifyContent="end">
          <MyHistoryFilter control={props.formControl} onFilter={props.onFilter} />
        </PBox>
      </PBox>
      {props.transactions?.length !== 0 ? (
        <PBox>
          {props.transactions?.map(t => (
            <RowT key={t.hash} tx={t} />
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
