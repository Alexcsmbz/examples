import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {CAccordion} from 'components/containers/c-accordion';
import {faqInstructions} from '../../constants';
import {Route} from 'constants/routes';
import {PLink} from 'components/primitives/p-link';
import {Icon} from 'assets/icons';

export const SectionMainD = () => {
  return (
    <CAdaptiveBox className="fade-in" maxWidth="1230px" padding="16px 15px">
      <PBox marginBottom="89px">
        <PBox marginBottom="24px">
          <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="baseline" gap="24px">
            <PTypo variant="h1">F.A.Q.</PTypo>

            <PLink asButton variant="apply" to={Route.contact.path}>
              <Icon.Mail />
              Submit a request
            </PLink>
          </PBox>
        </PBox>
        <PBox marginBottom="89px">
          {faqInstructions?.map(f => (
            <CAccordion key={`faq-panel-${f.id}`} title={f.title} content={f.data} open={f.opened} />
          ))}
        </PBox>
      </PBox>
    </CAdaptiveBox>
  );
};
