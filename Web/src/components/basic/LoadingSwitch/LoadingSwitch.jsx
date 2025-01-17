import ErrorComponent from "../NotFound/NotFound";
import loadingSVG from '../../../assets/loading.svg';
import { STATUS } from '../../../services/AxiosService';

function LoadingSwitch({ children , status}) {
    return (
        <>
            {status === STATUS.LOADING ?
                <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
                    <img src={loadingSVG} />
                </div>
                :
                status === STATUS.ERROR ?
                    <ErrorComponent />
                    :
                    children
                }
        </>
    );
}

export default LoadingSwitch;