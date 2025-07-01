
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Phone, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'role'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const { toast } = useToast();

  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate OTP sending
    toast({
      title: "OTP Sent",
      description: `OTP sent to +91 ${phoneNumber}`,
    });
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    // Simulate OTP verification
    toast({
      title: "OTP Verified",
      description: "Phone number verified successfully",
    });
    setStep('role');
  };

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
    toast({
      title: "Role Selected",
      description: `Logged in as ${role}`,
    });
    
    // Simulate login and close modal
    setTimeout(() => {
      onOpenChange(false);
      // Reset state
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setSelectedRole('');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 justify-center mb-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <DialogTitle className="text-green-800">FarmTrace Login</DialogTitle>
          </div>
        </DialogHeader>

        {step === 'phone' && (
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center pb-2">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Enter Phone Number</CardTitle>
              <CardDescription>
                We'll send you an OTP to verify your number
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    +91
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendOtp} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={phoneNumber.length !== 10}
              >
                Send OTP
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'otp' && (
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center pb-2">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Verify OTP</CardTitle>
              <CardDescription>
                Enter the 6-digit code sent to +91 {phoneNumber}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="otp">OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              <Button 
                onClick={handleVerifyOtp} 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={otp.length !== 6}
              >
                Verify OTP
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setStep('phone')}
                className="w-full text-green-600 hover:text-green-700"
              >
                Change Phone Number
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'role' && (
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Select Your Role</CardTitle>
              <CardDescription>
                Choose how you'll use FarmTrace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { role: 'Subscriber', desc: 'I want to subscribe to organic produce', icon: '🏠' },
                { role: 'Farmer', desc: 'I grow organic produce and want to sell', icon: '🌾' },
                { role: 'Delivery Partner', desc: 'I want to deliver organic produce', icon: '🚚' },
                { role: 'Admin', desc: 'Platform administrator', icon: '⚙️' }
              ].map((item) => (
                <Button
                  key={item.role}
                  variant="outline"
                  className="w-full h-auto p-4 justify-start border-green-200 hover:border-green-400 hover:bg-green-50"
                  onClick={() => handleRoleSelection(item.role)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold text-green-800">{item.role}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};
