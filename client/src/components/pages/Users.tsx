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

const mockUsers = {
  admin: [
    { id: 1, username: "superadmin", role: "ADMIN" },
    { id: 2, username: "admin2", role: "ADMIN" },
  ],
  salesman: [
    { id: 3, username: "john", role: "SALESMAN" },
    { id: 4, username: "mary", role: "SALESMAN" },
  ],
  fulfillment: [{ id: 5, username: "worker1", role: "FULFILLMENT" }],
};

const Users = () => {
  const renderTable = (users: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] font-semibold">Username</TableHead>
          <TableHead className="font-semibold">Role</TableHead>
          <TableHead className="font-semibold">Contact No</TableHead>
          <TableHead className="font-semibold text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>XXXXXXXXXX</TableCell>
            <TableCell className="text-right space-x-2">
              <Button size="sm" variant="outline">
                <Pencil />
              </Button>
              <Button size="sm" variant="destructive">
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
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
        <div className="w-full flex items-center justify-between gap-3 mb-2 sticky top-0  backdrop-blur-md bg-white/30 border-b border-white/40 z-10 py-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <AddUser />
        </div>

        <TabsContent value="admin" className="p-4">
          {renderTable(mockUsers.admin)}
        </TabsContent>
        <TabsContent value="salesman" className="p-4">
          {renderTable(mockUsers.salesman)}
        </TabsContent>
        <TabsContent value="fulfillment" className="p-4">
          {renderTable(mockUsers.fulfillment)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
