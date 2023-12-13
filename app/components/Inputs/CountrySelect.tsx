"use client";

import useCountries from "@/app/hooks/useCountries";
import React from "react";
import Select from "react-select";

export type CountrySelectType = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectType;
  onChange: (value: CountrySelectType) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectType)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <div className="">{option.flag}</div>
          <div>
            {option.label},
            <span className="text-neutral-800 ml-1">{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}

      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffee4e6'
        }
      })}
    />
  );
};

export default CountrySelect;
