import { Button } from "@/components/backend/ui/button";
import { Card } from "@/components/backend/ui/card";
import { Input } from "@/components/backend/ui/input";
import { Label } from "@/components/backend/ui/label";
import { Switch } from "@/components/backend/ui/switch";
import { Bell, Lock, User } from "lucide-react";

const Settings = () => {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <User className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-medium">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Bell className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-medium">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email updates about your workflow activity</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-gray-500">Get push notifications for important updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Lock className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-medium">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;