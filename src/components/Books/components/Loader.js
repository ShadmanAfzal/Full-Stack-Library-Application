import { Bars } from 'react-loader-spinner.js'
import './css/loader.css';

export const Loader = () => {
    return <Bars
        height="80"
        width="80"
        color="#292b2c"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loader-class"
        visible={true}
    />;
}