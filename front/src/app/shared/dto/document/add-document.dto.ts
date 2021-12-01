import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";

export type AddDocumentDto = {
  name: string,
  file: File,
};
