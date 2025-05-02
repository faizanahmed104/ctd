import React from 'react';
import { PropagateLoader } from 'react-spinners';

function Loader({loading,height="h-80"}) {
    return (
        <div className={`flex items-center justify-center ${height}`}>
            <PropagateLoader size={15} color='#50B69A' loading={loading} />
        </div>
    );
}

export default Loader;
