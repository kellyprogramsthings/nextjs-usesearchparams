"use client";
import { useCallback } from "react";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

  const removeFilter = (type: string) => {
		const params = new URLSearchParams(searchParams?.toString());
		params.delete(type);

		replace(`${pathname}?${params}`);
	};

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchHandler = useCallback(
    _.debounce((search) => {
        const params = new URLSearchParams(searchParams?.toString());
        search.target.value
            ? params.set("search", search.target.value)
            : params.delete("search");
        replace(`${pathname}?${params}`);
    }, 300),
    []
  );

  return (
    <>
      <input className="border border-black" onChange={searchHandler}/>
      <button onClick={() => removeFilter("test")}>Remove</button>
    </>
  );
}
