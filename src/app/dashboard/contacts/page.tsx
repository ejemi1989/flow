"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ContactList from "@/components/contacts/ContactList";

const ContactsPage = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Button onClick={() => router.push("/dashboard/contacts/add")}>
          Add Contact
        </Button>
      </div>
      <ContactList />
    </div>
  );
};

export default ContactsPage;