import {Server} from "miragejs";
import {XMLHttpRequest} from "./XMLHttpRequest";

let server: Server | null = null;

type MockConfiguration = {
  passthrough?: string[];
  dev: boolean;
};

export class Mock {
  public static initialize(configuration: MockConfiguration) {
    if (!configuration.dev) {
      return;
    }

    const passthrough = [
      // Allow unhandled requests on the *current domain*
      "*",
      // All external domains should be set up explicitly
      ...(configuration.passthrough ?? []),
    ];

    server = new Server({
      routes() {
        passthrough.forEach((entry) => {
          this.passthrough(entry);
        });
      },
    });
    XMLHttpRequest.fix();
  }

  public static use(fn: (server: Server<{}>) => unknown) {
    if (server) {
      fn(server);
    }
  }
}

// Sample usage:
//
// Initialization:
// ExtensionsMock.Mock.initialize({
//   dev: __DEV__,
//   passthrough: ["https://tagme.apps.dev-gen1-dm.delta.sbrf.ru/*"],
// });
//
// Interception:
// ExtensionsMock.Mock.use((mock) => {
//     mock.get("/api/v0/employees", () => {
//         return new ExtensionsMock.Response(
//             429,
//             {some: 'header'},
//             {errors: ['name cannot be blank']}
//         );
//     });
// });
