import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Search, Trash } from "lucide-react";
import { Input } from "../ui/input";
import AddUser from "../common/AddUser";
import { useDeleteUser, useFetchUsers } from "@/hooks/userHooks";
import Loader from "../common/Loader";
import UserFormDialog from "../common/UserFormDialog";

const Users = () => {
  const { data, isLoading, error } = useFetchUsers();
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteUser();
  const [query, setQuery] = useState("");
  const currentId = localStorage.getItem("id");

  const handleDelete = (id: any) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error occurred</div>;

  const filteredUsers = (users: any[]) =>
    users.filter((u) => u.username.toLowerCase().includes(query.toLowerCase()));

  const renderTable = (users: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] font-semibold">Username</TableHead>
          <TableHead className="font-semibold">All Roles</TableHead>
          <TableHead className="font-semibold">Contact No</TableHead>
          <TableHead className="font-semibold text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <>
            <UserFormDialog open={open} setOpen={setOpen} user={user} />
            <TableRow key={user.id}>
              <TableCell className="font-medium flex items-center gap-2">
                {user.username}
                {currentId === user.id && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">
                    You
                  </span>
                )}
              </TableCell>
              <TableCell>
                {user.roles.map((role: string, i: number) => (
                  <p key={i}>{role}</p>
                ))}
              </TableCell>
              <TableCell>{user.contactNumber}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setOpen(true)}
                >
                  <Pencil />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
                  disabled={!!currentId && currentId === user.id}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="pt-4">
      <Tabs defaultValue="admin">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="salesman">Salesman</TabsTrigger>
          <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
        </TabsList>

        <div className="w-full flex items-center justify-between gap-3 mb-2 sticky top-0 backdrop-blur-md bg-white/30 border-b border-white/40 z-10 py-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <AddUser />
        </div>

        <TabsContent value="admin" className="p-4">
          {data?.admin && renderTable(filteredUsers(data.admin))}
        </TabsContent>
        <TabsContent value="salesman" className="p-4">
          {data?.salesman && renderTable(filteredUsers(data.salesman))}
        </TabsContent>
        <TabsContent value="fulfillment" className="p-4">
          {data?.fulfillment && renderTable(filteredUsers(data.fulfillment))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
