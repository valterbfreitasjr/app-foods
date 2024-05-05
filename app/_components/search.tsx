import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex gap-4">
      <Input placeholder="Buscar retaurantes" className="border-noness" />
      <Button size="icon">
        <SearchIcon size={16} />
      </Button>
    </div>
  );
};

export default Search;
