export default function RoleHandler(role: number[]) {
  if (role.length == 1) {
    switch (role[0]) {
      case 1:
        return "<:tank:1132561045064536074>";
        case 2:
          return "<:healer:1132561031261061170>";
          case 3:
            return "<:dps:1132561025435193444>";
            default:
              return "<:any:1143627104362168530>";
            }
  } else if (role.length == 2) {
    const temp = role.reduce((a,b) => {
      return a+b;
    })
    switch (temp) {
      case 3:
        return "<:tankhealer:1146187167119462562>"
      case 4:
        return "<:tankdps:1146187145875292210>";
      case 5:
        return "<:healerdps:1146187120436850849>";
    }
  } else if (role.length == 3) {
    return "<:tankhealerdps:1146187181468164206>";
  }
  return;
}