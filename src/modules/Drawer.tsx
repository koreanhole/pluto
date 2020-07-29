import * as React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import {
  Drawer as KittenDrawer,
  DrawerItem as KittenDrawerItem,
  IndexPath,
} from "@ui-kitten/components";

export default function Drawer({
  navigation,
  state,
}: DrawerContentComponentProps) {
  return (
    <React.Fragment>
      <KittenDrawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <KittenDrawerItem title="HOME" />
      </KittenDrawer>
    </React.Fragment>
  );
}
