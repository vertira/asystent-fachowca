import { getUser } from "@/lib/server-actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardAccountName from "@/components/settings/cardAccountName";
import CardAccountEmail from "@/components/settings/cardAccountEmail";
import CardAccountPassword from "@/components/settings/cardAccountPassword";
import CardAccountAvatar from "@/components/settings/cardAccountAvatar";
import StaffCard from "@/components/settings/staff-card";
import EmployeesCard from "@/components/settings/employees-card";
import NewEmployee from "@/components/settings/new-employee";
import { Permisions } from "@/components/settings/permisions";
type Role = "EMPLOYER" | "STAFF";
interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  employees: {
    name: string;
    image: string;
  };
  registrationCodes: {
    id: string;
    code: string;
    used: boolean;
    expiresAt: Date;
  };
  password: string;
  role: Role;
  employerId: string;
  isPremium: boolean;
}

const Settings = async () => {
  const authenticatedUser = await auth();
  if (!authenticatedUser) {
    redirect("/");
  }
  const user: User = await getUser();
  const {
    name,
    email,
    role,
    image,
    employerId,
    employees,
    registrationCodes,
    isPremium,
  } = user;
  return (
    <div className="flex-1 flex flex-col bg-myBackground">
      <div className="flex  flex-col justify-start md:mx-auto md:w-3/4 py-4 px-6 md:px-4 ">
        <h1 className="text-4xl font-extrabold">Ustawienia</h1>
        <p className="text-myText-muted pb-2">Zarządzaj swoimi ustawieniami</p>
      </div>
      <div className="flex flex-col h-full mx-auto w-full md:w-3/4 md:px-4">
        <Tabs defaultValue="account" className="w-full flex flex-col flex-1">
          <TabsList className="max-w-full mx-4 md:mx-0">
            <TabsTrigger value="account" className="w-full">
              Konto
            </TabsTrigger>
            {role === "EMPLOYER" ? (
              <TabsTrigger value="employees" className="w-full">
                Pracownicy
              </TabsTrigger>
            ) : null}
            {role === "EMPLOYER" ? (
              <TabsTrigger value="permisions" className="w-full">
                Uprawnienia
              </TabsTrigger>
            ) : null}
          </TabsList>
          <TabsContent value="account" className="flex h-fit ">
            <div className="grid grid-cols-1 bg-cardBackground/0 relative z-10 flex-1 w-full p-4">
              <div className="w-full h-full bg-cardBackground/90 -z-10 absolute md:rounded-lg top-0 left-0"></div>
              <div className="glassPattern2 w-full h-full rotate-180 absolute md:rounded-lg top-0 left-0"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-fit  w-full">
                {role === "STAFF" ? (
                  <StaffCard employerId={employerId} />
                ) : null}
                <CardAccountAvatar image={image} role={role} />
                <CardAccountName name={name} />
                <CardAccountEmail email={email} />
                <CardAccountPassword />
              </div>
            </div>
          </TabsContent>
          {role === "EMPLOYER" ? (
            <TabsContent value="employees" className="flex h-fit md:mb-10">
              <div className="grid grid-cols-1 bg-cardBackground/0 relative z-10 flex-1 w-full p-4">
                <div className="w-full h-full bg-cardBackground/90 -z-10 absolute md:rounded-lg top-0 left-0"></div>
                <div className="glassPattern2 w-full h-full rotate-180 absolute md:rounded-lg top-0 left-0"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-fit  w-full">
                  <EmployeesCard employees={employees} />
                  <NewEmployee
                    registrationCodes={registrationCodes}
                    isPremium={isPremium}
                    employees={employees}
                  />
                </div>
              </div>
            </TabsContent>
          ) : null}
          {role === "EMPLOYER" ? (
            <TabsContent value="permisions" className="flex h-fit md:mb-10">
              <div className="grid grid-cols-1 bg-cardBackground/0 relative z-10 flex-1 w-full p-4">
                <div className="w-full h-full bg-cardBackground/90 -z-10 absolute md:rounded-lg top-0 left-0"></div>
                <div className="glassPattern2 w-full h-full rotate-180 absolute md:rounded-lg top-0 left-0"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-fit min-h-96  w-full">
                  <Permisions employees={employees} />
                </div>
              </div>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
