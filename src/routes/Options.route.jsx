import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Avatar,
  Divider,
} from "@mui/material";
import { Character } from "../model/Characters.model";
import { useAbilities } from "../contexts/Abilities.context";
import { useCommands } from "../contexts/Commands.context";
import { useWishlist } from "../contexts/Wishlist.context";

import { clip } from "../theme/shapes.theme";

import TerraAvatar from "../assets/terra.webp";
import VentusAvatar from "../assets/ventus.webp";
import AquaAvatar from "../assets/aqua.webp";

const selectAvatar = (char) => {
  switch (char) {
    case Character.Terra:
      return TerraAvatar;
    case Character.Ventus:
      return VentusAvatar;
    case Character.Aqua:
      return AquaAvatar;
    default:
      return null;
  }
};

const Options = () => {
  const { t } = useTranslation();
  const { resetAbilities } = useAbilities();
  const { resetCommands } = useCommands();
  const { clearWishlist } = useWishlist();

  const buttonsData = useMemo(() => {
    return [
      { type: "abilities", label: t("labels.resetAbilities") },
      { type: "commands", label: t("labels.resetCommands") },
      { type: "wishlist", label: t("labels.resetWishlist") },
    ];
  }, [t]);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    character: null,
    type: null,
  });

  const handleResetClick = (character, type) => {
    setConfirmDialog({
      open: true,
      character,
      type,
    });
  };

  const handleConfirmReset = () => {
    const { character, type } = confirmDialog;

    switch (type) {
      case "abilities":
        resetAbilities(character);
        break;
      case "commands":
        resetCommands(character);
        break;
      case "wishlist":
        clearWishlist(character);
        break;
    }

    setConfirmDialog({ open: false, character: null, type: null });
  };

  const handleCancelReset = () => {
    setConfirmDialog({ open: false, character: null, type: null });
  };

  const getDialogMessage = () => {
    const { character, type } = confirmDialog;
    return t("messages.confirmReset", {
      character,
      type: t(`labels.${type}`),
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: "60%", mx: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        fontFamily="KHGummi"
        sx={{
          color: (theme) => theme.typography.onBackground.color,
          textShadow: (theme) => theme.typography.onBackground.textShadow,
          mb: 4,
        }}
      >
        {t("labels.options")}
      </Typography>

      {Object.values(Character).map((character) => (
        <Paper
          key={character}
          sx={{
            p: 3,
            mb: 3,
            bgcolor: (theme) => theme.palette.background.paper,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              gap: 2,
            }}
          >
            <Avatar
              src={selectAvatar(character)}
              alt={character}
              sx={{ width: 48, height: 48 }}
            />
            <Typography
              variant="h5"
              fontFamily="KHGummi"
              sx={{
                color: (theme) => theme.typography.onBackground.color,
                textShadow: (theme) => theme.typography.onBackground.textShadow,
              }}
            >
              {character}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {buttonsData.map((button) => (
              <Button
                key={button.type}
                variant="contained"
                color="error"
                onClick={() => handleResetClick(character, button.type)}
                sx={{
                  justifyContent: "flex-start",
                  clipPath: clip.menuItem,
                  borderRadius: "2px",
                  borderTop: "2px solid rgba(255,255,255,0.3)",
                  borderBottom: "2px solid rgba(0,0,0,0.3)",
                  textTransform: "none",
                  textShadow: (theme) =>
                    theme.typography.onBackground.textShadow,
                }}
              >
                {button.label}
              </Button>
            ))}
          </Box>
        </Paper>
      ))}

      <Dialog
        open={confirmDialog.open}
        onClose={handleCancelReset}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {t("labels.confirmReset")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {getDialogMessage()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelReset} color="primary">
            {t("labels.cancel")}
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmReset}
            color="error"
            autoFocus
          >
            {t("labels.reset")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Options;
