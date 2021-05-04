import * as React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useRouter } from "next/router";
import { AttachmentLinksType } from "src/components/types";
import CloudDownload from "@material-ui/icons/CloudDownload";

interface AppLayoutProps {
  title: string;
  attachmentLinks?: AttachmentLinksType[];
  children: React.ReactNode;
}

const AppBarHomeText = styled.div`
  cursor: pointer;
  margin-right: auto;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { title, children, attachmentLinks } = props;

  const router = useRouter();

  const handleClickHome = () => {
    router.push("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AppBarHomeText onClick={handleClickHome}>
            <Typography variant="h6">{title}</Typography>
          </AppBarHomeText>
          {typeof attachmentLinks !== "undefined" && (
            <IconButton color="inherit" aria-label="download">
              <CloudDownload />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
