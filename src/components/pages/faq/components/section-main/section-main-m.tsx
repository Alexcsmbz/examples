import {PBox} from 'components/primitives/p-box';
import {PTypo} from 'components/primitives/p-typo';
import {CAdaptiveBox} from 'components/containers/c-adaptive-box';
import {CAccordion} from 'components/containers/c-accordion';
import {faqInstructions} from '../../constants';
import {Route} from 'constants/routes';
import {PLink} from 'components/primitives/p-link';
import {Icon} from 'assets/icons';

export const SectionMainM = () => {
  return (
    <CAdaptiveBox className="fade-in" padding="16px 20px 40px">
      <PBox marginBottom="24px">
        <PBox display="grid" gridAutoFlow="column" justifyContent="space-between" alignItems="baseline" gap="24px">
          <PTypo variant="h2">F.A.Q.</PTypo>

          <PLink asButton form="round" shape="round" size="medium" shadow variant="apply" to={Route.contact.path}>
            <Icon.Mail />
          </PLink>
        </PBox>
      </PBox>
      <PBox>
        {faqInstructions?.map(f => (
          <CAccordion key={`faq-panel-${f.id}`} title={f.title} content={f.data} open={f.opened} />
        ))}
      </PBox>
    </CAdaptiveBox>
  );
};
