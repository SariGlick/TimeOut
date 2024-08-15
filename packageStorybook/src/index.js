import GenericButton from './Button/GenericButton';
import Footer from './footer/FooterComponent';
import GenericInput from './GenericInput/genericInput';
import ResponsiveAppBar from './header/header';
import Loader from './loader/loader';
import RadioButton from './RadioButton/radio-Button';
import Select from './Select/Select';
import TableComponent from './table/TableComponent';
import LabTabs from './tabs/tabs';
import ToastMessage from './Toast/ToastMessage';

// קודם כל, נייצא כל קומפוננט בנפרד
export {
    GenericButton,
    Footer,
    GenericInput,
    ResponsiveAppBar,
    Loader,
    RadioButton,
    Select,
    TableComponent,
    LabTabs,
    ToastMessage
};

// אז נייצא גם את האובייקט המרוכז
const MyReactLibrary = {
    GenericButton,
    Footer,
    GenericInput,
    ResponsiveAppBar,
    Loader,
    RadioButton,
    Select,
    TableComponent,
    LabTabs,
    ToastMessage
};

export default MyReactLibrary;

// זה בסדר להוסיף לחלון, אבל רק בסביבת דפדפן
if (typeof window !== 'undefined') {
    window.MyReactLibrary = MyReactLibrary;
}