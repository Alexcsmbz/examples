import {Blockchain} from 'types/custom';

export type SectionBlockchainProps = {
  chooseBlockchain?: ({blockchain}: {blockchain: Blockchain}) => void;
};
