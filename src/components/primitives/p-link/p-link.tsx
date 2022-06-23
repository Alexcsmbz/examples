import {memo} from 'react';
import {styles} from './p-link.styles';
import {animation} from '../p-button/p-button.styles';
import {PLinkProps} from './p-link.types';
import {cx} from '@emotion/css';
import {Link} from 'react-router-dom';

const PLink = ({to, target, children, className, external = false, ...stylesProps}: PLinkProps) =>
  external ? (
    <a
      href={to}
      target={target}
      className={cx(styles(stylesProps), className, stylesProps.asButton ? animation : undefined)}
      rel={target ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  ) : (
    <Link
      to={to}
      target={target}
      className={cx(styles(stylesProps), className, stylesProps.asButton ? animation : undefined)}
      rel={target ? 'noreferrer' : undefined}
    >
      {children}
    </Link>
  );

export const PLinkMemoized = memo(PLink);
