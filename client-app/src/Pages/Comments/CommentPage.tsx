import { Textarea, Button, IconButton } from "@material-tailwind/react";
import React from 'react';
import "./CommentPage.css";

export function CommentPage() {
  return (
    <div className="relative w-[32rem]">

<div className="relative w-[32rem] flex justify-end">
  <button className="btn btn-circle btn-outline">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
  </button>
</div>

      <h2>你好，Maggie </h2>
      <h2>您的寶貴意見，是我們不斷進步的動力！</h2>
      <p>  <h2>請為 Blue Bottle Coffee 評分</h2></p>
      <div className="center-content">
    
<div className="rating rating-md">
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" />
</div>
        
      </div>

      <Textarea style={{ paddingTop: '1rem' }} variant="static" placeholder="請留下你的保貴意見！" rows={15} />


      
      <div className="flex flex-col items-center py-1.5">
        <div className="flex gap-2">
        <button className="btn btn-wide">提交</button>
        </div>
      </div>
    </div>
  );
}
