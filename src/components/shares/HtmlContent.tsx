import React from 'react'

function HtmlContent({ htmlString }: { htmlString: string }) {
   return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}

export default React.memo(HtmlContent);
