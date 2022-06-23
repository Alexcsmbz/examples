import {injectGlobal} from '@emotion/css';
import {theme} from 'constants/theme';

export const useGlobalStyles = () => injectGlobal`
  @font-face {
		font-family: 'Open Sans Regular';
		font-style: normal;
		src: url(/fonts/OpenSans-Regular.woff) format('woff'), 
			url(/fonts/OpenSans-Regular.woff2) format('woff2');
		font-display: swap;
  }

  @font-face {
		font-family: 'Open Sans SemiBold';
		font-style: normal;
		src: url(/fonts/OpenSans-SemiBold.woff) format('woff'), 
			url(/fonts/OpenSans-SemiBold.woff2) format('woff2');
		font-display: swap;
  }

  @font-face {
		font-family: 'Roboto Regular';
		font-style: normal;
		src: url(/fonts/Roboto-Regular.woff) format('woff'), 
			url(/fonts/Roboto-Regular.woff2) format('woff2');
		font-display: swap;
  }

  @font-face {
		font-family: 'Roboto SemiBold';
		font-style: normal;
		src: url(/fonts/Roboto-SemiBold.woff) format('woff'), 
			url(/fonts/Roboto-SemiBold.woff2) format('woff2');
		font-display: swap;
  }

  html {
		height: 100%;
		box-sizing: border-box;
  }

  *,
  *::after,
  *::before {
		font-family: 'Roboto Regular';
		box-sizing: inherit;
  }

  body {
    height: 100%;
		min-width: 320px;
		margin: 0;
  }

  #root {
    height: 100%;
  }

  ul, ol {
		list-style: none;
		padding: 0;
		margin: 0;
  }

  h1 {
		margin: 0;
  }

  img {
		max-width: 100%;
		height: auto;
  }

  a {
		color: #000000;
		text-decoration: none;
  }

  p {
		margin: 0;
  }

  mark {
		background-color: #FFE986;
		mix-blend-mode: darken;
		padding: 0 8px;
  }

  button {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		background-color: transparent;
  }

  input, textarea {
		padding: 0;
		border: 0;
		outline: 0;
		background-color: transparent;
  }

  fieldset {
		margin: 0;
		padding: 0;
		border: 0;
  }

  select {
		border: 0;
		background-color: transparent;
  }

  .visually-hidden {
		clip: rect(0 0 0 0);
		position: absolute;
		width: 0;
		height: 0;
		opacity: 0;
  }
  
  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  textarea {
		resize: none;
		font-family: 'Roboto Regular';
  }

  label {
		cursor: pointer;
  }

  .link {
		color: #7BB3F5;
		text-decoration: underline;
  }

  @keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.9);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
  }

  .fade-in {
  	animation-name: fade-in;
  	animation-duration: 300ms;
		transform-origin: top center;
  }

  .web3modal-modal-lightbox {
	  z-index: 6;
	  background-color: ${theme.pallete.light.grey[900]}80;
  }

  .stars__control:not(.stars__control--menu-is-open) {
	.stars__dropdown-indicator {
		transform: rotate(0)
	}
  }

  .stars__menu {
		z-index: 9;
  }

  .link-overflow {
	  display: inline-block;
	  white-space: nowrap;
	  max-width: 160px;
	  overflow: hidden;
	  text-overflow: ellipsis;
  }

  .smooth-scroll-section {
	  padding-top: 15px;
  } 
`;
