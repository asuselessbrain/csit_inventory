import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

export default function ProjectThesisMemberCard({
  label,
  name,
  stdId,
  email,
}: {
  label: string;
  name: string;
  stdId?: string;
  email?: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="" alt={name} />
          <AvatarFallback className="bg-primary/10">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">
            {stdId ? stdId : email}
          </p>
        </div>
      </div>
    </div>
  );
}
