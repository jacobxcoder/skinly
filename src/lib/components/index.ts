import Button from './common/button/button.svelte';
import InputText from './common/input-text/input-text.svelte';
import InputNumber from './common/input-number/input-number.svelte';
import Textarea from './common/textarea/textarea.svelte';
import Checkbox from './common/checkbox/checkbox.svelte';
import Popover from './common/popover/popover.svelte';
import Slideover from './common/slideover/slideover.svelte';
import Loader from './common/loader/loader.svelte';
import Dialog from './common/dialog/dialog.svelte';

// A standard notifications container component,
// with a store and a function to add notifications
import Notifications from './page/notifications/notifications.svelte';

// @TODO: notify should work differently on iOS, Android and web app
import { notify } from './page/notifications/notifications-store';

// @DO: This header should be modified to include a navigation menu
// for your particular application
import NavigationHeader from './page/navigation-header/navigation-header.svelte';

export {
  Button,
  InputText,
  InputNumber,
  Textarea,
  Checkbox,
  Popover,
  Slideover,
  Loader,
  Dialog,
  NavigationHeader,
  Notifications,
  notify
};
