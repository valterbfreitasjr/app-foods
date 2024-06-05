"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Buscar retaurantes"
        className="border-noness"
        onChange={handleChange}
        value={search}
      />
      <Button size="icon" type="submit">
        <SearchIcon size={16} />
      </Button>
    </form>
  );
};

export default Search;
