import '../styles/h5p-components.css';
import H5PCoverPage from '../components/h5p-cover-page.ts';
import H5PButton from '../components/h5p-button.ts';
import Draggable from '../components/h5p-draggable.js';
import Dropzone from '../components/h5p-dropzone.js';
import Navigation from '../components/h5p-navigation.js';
import PlaceholderImg from '../components/h5p-placeholder-img.js';
import ProgressBar from '../components/h5p-progress-bar.js';
import ProgressDots from '../components/h5p-progress-dots.js';
import ResultScreen from '../components/h5p-result-screen.js';

// eslint-disable-next-line no-global-assign
H5P = H5P || {};
H5P.Components = H5P.Components || {};

H5P.Components.CoverPage = H5PCoverPage;
H5P.Components.Button = H5PButton;
H5P.Components.Draggable = Draggable;
H5P.Components.Dropzone = Dropzone;
H5P.Components.Navigation = Navigation;
H5P.Components.PlaceholderImg = PlaceholderImg;
H5P.Components.ProgressBar = ProgressBar;
H5P.Components.ProgressDots = ProgressDots;
H5P.Components.ResultScreen = ResultScreen;
