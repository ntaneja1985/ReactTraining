import { memo } from "react";

export const CounterSummaryDetail = memo(function CounterSummaryDetail({ name, total }) {
    //making the function impure
    //name.shortName = name.shortName + ":"

    //Fixing it by making a copy of name variable
    const newShortName = {...name,shortName:name.shortName + ":"}

  return (
      <p>{newShortName.shortName} ({total})</p>
  )
});