import {ExtensionsReact} from "@app/extensions-react";
import {ThemeMount} from "@app/ui-web-core";
import * as React from "react";
import {createRoot} from "react-dom/client";

export class NotificationTemplate {
  private static id = "notification-template";
  private static mounted = false;

  private static configuration: JSX.Element | null = null;
  private static onOpen?: (children: JSX.Element) => void;
  private static onClose?: () => void;

  private static open(children: JSX.Element) {
    if (NotificationTemplate.onOpen) {
      NotificationTemplate.onOpen(children);
    } else {
      //  We can't wait for mount in R18, thus we have a default state
      NotificationTemplate.configuration = children;
    }
  }

  private static close() {
    if (NotificationTemplate.onClose) {
      NotificationTemplate.onClose();
    }
  }

  public static use() {
    if (!NotificationTemplate.mounted) {
      NotificationTemplate.mount();
    }

    return {
      onOpen: (children: JSX.Element) => NotificationTemplate.open(children),
      onClose: () => NotificationTemplate.close(),
    };
  }

  public static mount(id: string = NotificationTemplate.id) {
    NotificationTemplate.id = id;
    NotificationTemplate.mounted = true;
    const Component = NotificationTemplate.component;

    return createRoot(ExtensionsReact.getDomNode(id)).render(
      <ThemeMount>
        <Component />
      </ThemeMount>,
    );
  }

  private static component() {
    const [configuration, setConfiguration] = React.useState(NotificationTemplate.configuration);

    const onClose = React.useCallback(() => {
      setConfiguration(null);
    }, []);

    const onOpen = React.useCallback((children: JSX.Element) => {
      setConfiguration(children);
    }, []);

    NotificationTemplate.onOpen = onOpen;
    NotificationTemplate.onClose = onClose;

    return (
      <>
        {configuration &&
          React.cloneElement(configuration, {
            onClose,
          })}
      </>
    );
  }
}

