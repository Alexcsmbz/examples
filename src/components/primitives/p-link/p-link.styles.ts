import {PLinkStyles} from './p-link.types';
import {styles as buttonStyles} from '../p-button/p-button.styles';

export const styles = ({asButton, ...props}: PLinkStyles) => (asButton ? buttonStyles(props) : undefined);
