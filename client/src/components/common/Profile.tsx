import { useGetProfile } from "@/hooks/userHooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Pencil, UserRound } from "lucide-react";
import UserFormDialog from "./UserFormDialog";
import { useState } from "react";

const Profile = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const id = localStorage.getItem("id");
  const { data: user, isLoading } = useGetProfile(id);
  const [openEdit, setOpenEdit] = useState(false);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4">No profile found</p>;

  return (
    <>
      <UserFormDialog open={openEdit} setOpen={setOpenEdit} user={user} />
      <Dialog open={open} onOpenChange={(shouldOpen) => setOpen(shouldOpen)}>
        <DialogContent className="max-w-md p-0 overflow-hidden rounded-xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-lg font-semibold text-center">
              My Profile
            </DialogTitle>
          </DialogHeader>

          <Card className="shadow-none border-none">
            <CardContent className="p-6 flex flex-col items-center space-y-6">
              <div className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center">
                <UserRound className="w-20 h-20 text-gray-700" />
                <div
                  className="absolute w-10 h-10 bottom-1 right-1 flex items-center justify-center 
                  bg-black rounded-full shadow-md cursor-pointer 
                  hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setOpenEdit(true);
                  }}
                >
                  <Pencil className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="w-full space-y-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="text-base font-medium">{user.username}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Number
                  </p>
                  <p className="text-base font-medium">{user.contactNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Roles</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.roles.map((role: string, idx: number) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="rounded-full px-3 py-1 bg-green-100 text-green-600"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
