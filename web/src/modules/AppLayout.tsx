import * as React from "react";
import { AppBar, Toolbar, Typography, IconButton, Link } from "@material-ui/core";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AttachmentLinksType } from "src/components/types";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PublicIcon from "@material-ui/icons/Public";
interface AppLayoutProps {
  title: string;
  attachmentLinks?: AttachmentLinksType[];
  noticeUrl?: string;
  children: React.ReactNode;
}

const AppBarHomeText = styled.div`
  cursor: pointer;
  margin-right: auto;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { title, children, attachmentLinks, noticeUrl } = props;

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickAttachment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAttachment = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AppBarHomeText onClick={handleClickHome}>
            <Typography variant="h6">{title}</Typography>
          </AppBarHomeText>
          {typeof noticeUrl !== "undefined" && (
            <IconButton color="inherit" aria-label="open-browser">
              <Link href={noticeUrl} target="_blank" rel="noreferrer" color="inherit">
                <PublicIcon style={{ display: "block" }} />
              </Link>
            </IconButton>
          )}
          {typeof attachmentLinks !== "undefined" && (
            <>
              <IconButton color="inherit" aria-label="download" onClick={handleClickAttachment}>
                <CloudDownload />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseAttachment}>
                {attachmentLinks.map((data) => (
                  <MenuItem
                    onClick={() => {
                      router.push(`${data.fileLink}`);
                    }}
                    key={data.fileLink}>
                    {data.fileName}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
