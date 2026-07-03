"use client"; 

import { AppBar, Toolbar, Box, IconButton, Avatar, Typography, Button, Badge, Menu, MenuItem, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { authService } from "@/src//services/authService"; 
import { notificationService, type Notification } from "@/src/services/notificationService";

export function Topbar() {
  const [user, setUser] = useState<any>(null);
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [notifError, setNotifError] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    
    setTimeout(() => {
      setUser(currentUser);
    }, 0);

    notificationService
      .list()
      .then(setNotifs)
      .catch(() => setNotifError(true));
  }, []);

  const unread = notifs.filter((n) => !n.read).length;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(11,15,23,0.75)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Toolbar className="!px-6 gap-4">
        <Box className="flex-1">
          <Typography variant="body2" className="!text-white/50">
            Bem-vindo de volta
          </Typography>
          <Typography variant="h6" className="!font-semibold text-white">
            {user?.nome || user?.name || "Investidor"}
          </Typography>
        </Box>

        <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={{ color: "white" }}>
          <Badge badgeContent={unread} color="success">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
          slotProps={{ paper: { sx: { minWidth: 340, bgcolor: "#111827", border: "1px solid rgba(255,255,255,0.08)" } } }}
        >
          {notifError && <MenuItem disabled sx={{ color: "rgba(255,255,255,0.5)" }}>Serviço de notificações indisponível</MenuItem>}
          {!notifError && notifs.length === 0 && <MenuItem disabled sx={{ color: "rgba(255,255,255,0.5)" }}>Sem notificações</MenuItem>}
          {notifs.map((n) => (
            <MenuItem key={n.id} className="!items-start !gap-2 !py-3">
              <Box className={`mt-1 h-2 w-2 rounded-full ${n.read ? "bg-white/20" : "bg-emerald-400"}`} />
              <ListItemText
                primary={n.title}
                secondary={`${n.body} · ${n.createdAt}`}
                slotProps={{
                  primary: { sx: { fontSize: 14, fontWeight: 600, color: "white" } },
                  secondary: { sx: { fontSize: 12, color: "rgba(255,255,255,0.55)" } },
                }}
              />
            </MenuItem>
          ))}
        </Menu>

        <Avatar sx={{ bgcolor: "#22c55e", color: "#0b0f17", fontWeight: 700, width: 36, height: 36 }}>
          {((user?.nome || user?.name || "I").slice(0, 1).toUpperCase())}
        </Avatar>
        
        <Button
          onClick={() => authService.logout()}
          startIcon={<LogoutIcon />}
          size="small"
          sx={{ color: "white", borderColor: "rgba(255,255,255,0.1)", "&:hover": { borderColor: "rgba(255,255,255,0.2)" } }}
          variant="outlined"
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}