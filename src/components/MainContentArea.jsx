import * as React from 'react';

import AnimalList from '../components/AnimalList';
import AssessmentsList from '../components/AssessmentsList';

const MainContentArea = ({componentToRender}) => {
    return(
        <div>
            {componentToRender}
        </div>
    );
}

export default MainContentArea;