import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import UserFormDialog from "./UserFormDialog";

const AddUser = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <UserFormDialog open={open} setOpen={setOpen} />
        </div>
      )}
      <Button size="lg" className="rounded-full" onClick={() => setOpen(true)}>
        <Plus />
        New User
      </Button>
    </>
  );
};

export default AddUser;
