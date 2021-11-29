
import React from 'react';
import TemplateRule from '../components/TemplateRule';


function CRFScale() {

  return (

    <div className='ml-100 mt-100'>
      <TemplateRule
        pageType='education'
        onCancelClick={() => { }}
        onSaveClick={(data: { ruleDoc: any }) => {

          console.log('============= onSaveClick ducation', JSON.stringify(data));
        }}>

      </TemplateRule>
    </div>
  );
}

export default CRFScale;
