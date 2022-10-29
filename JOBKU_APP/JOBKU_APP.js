import React from 'react';
import Navigator from './Navigator'
import {ProviderforAuth} from './Context/Context';

 const JOBKU_APP = () => {

    return(
        <ProviderforAuth>
            <Navigator/>
        </ProviderforAuth>
    )
}

export default JOBKU_APP;