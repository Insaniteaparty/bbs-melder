import {
  Modal,
  Box,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import Recipe from "./Recipe.component";
import AbilityIcon from "../assets/ability.webp";
import { underline } from "../theme/shapes.theme";
import { getCommandTypeIcon } from "../theme/icon.theme";
import { useState } from "react";

const rowMaxHeight = "2rem";

const meldColor = "#cf0000";
const meldPaperColor = "#fec600";
const resultClipPathStyle =
  "polygon(0 10px, 10px 0, 100% 0, 100% 0, 100% 100%, 0 100%)";

const MeldModal = ({ open, onClose, recipe, command }) => {
  const { t } = useTranslation();
  const [selectedAbility, setSelectedAbility] = useState(null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="recipe-modal-title"
      aria-describedby="recipe-modal-description"
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600, md: 800 },
          maxHeight: "90vh",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Recipe Component */}
        <Recipe
          recipe={recipe}
          value={selectedAbility}
          onChange={setSelectedAbility}
        />

        {/* Meld Section */}
        <Box sx={{ mt: 3, position: "relative" }}>
          {/* Red Triangle Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "-5px",
              right: "-1%",
              width: 0,
              height: 0,
              borderLeft: "73px solid transparent",
              borderRight: "73px solid transparent",
              borderTop: "20px solid red",
              zIndex: 10,
            }}
          />
          <Card
            sx={{
              minWidth: 300,
              clipPath:
                "polygon(0 0, 80% 0, 90% 15%, 100% 15%, 100% 100%, 50% 100%, 40% 85%, 3px 85%,  1px 84%, 0 82%)",
              bgcolor: meldPaperColor,
              borderBottomRightRadius: 0,
              borderTop: "2px solid rgba(255,255,255,0.3)",
              borderBottom: "2px solid rgba(0,0,0,0.2)",
            }}
          >
            <CardHeader
              title={t("labels.newCommand")}
              sx={{
                py: 0,
                position: "relative",
                "&::after": { ...underline(meldColor) },
              }}
              slotProps={{
                title: {
                  variant: "subtitle1",
                  fontFamily: "KHGummi",
                  fontSize: "1.5rem",
                  color: meldColor,
                },
              }}
            />
            <CardContent sx={{ pt: 0, pb: "0.5rem!important" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {/* Slot 1 */}
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box flex={1} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flex: 4,
                      gap: 1,
                      bgcolor: (theme) => theme.palette.primary.main,
                      borderRadius: "0 2rem 2rem 0",
                      borderTop: "1px solid rgba(255,255,255,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      clipPath: resultClipPathStyle,
                    }}
                  >
                    <Box
                      component="img"
                      src={getCommandTypeIcon(command.type)}
                      alt=""
                      sx={{ width: 24, height: 24, ml: 1 }}
                    />
                    <Typography variant="body2">
                      {t(`commands.${command.name}`)}
                    </Typography>
                  </Box>
                </Box>

                {/* Slot 2 */}
                <Box
                  sx={{
                    display: "flex",
                    maxHeight: rowMaxHeight,
                  }}
                >
                  <Box flex={1} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      flex: 4,
                      borderRadius: "0 2rem 2rem 0",
                      // Method 1: Multiple backgrounds (recommended)
                      background: [
                        `linear-gradient(90deg, ${meldPaperColor} 0%, transparent 10%)`,
                        "linear-gradient(rgba(0,0,0,0.8), rgba(67,67,67,0.8))",
                      ].join(", "),
                    }}
                  >
                    <Box
                      component="img"
                      src={AbilityIcon}
                      alt=""
                      sx={{ width: 24, height: 24, ml: 1 }}
                    />
                    <Typography variant="body2">
                      {t(`abilities.${selectedAbility}`) || "---"}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  height={"2rem"}
                  display={"flex"}
                  flex={1}
                  flexDirection={"row"}
                  justifyContent={"flex-end"}
                >
                  <Button
                    variant="contained"
                    sx={{
                      minWidth: "40%",
                      bgcolor: meldColor,
                      borderRadius: "2rem",
                      "&:hover": {
                        bgcolor: meldColor,
                        filter: "brightness(1.1)",
                      },
                    }}
                  >
                    ok
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Modal>
  );
};

export default MeldModal;
