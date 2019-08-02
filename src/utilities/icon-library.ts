import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

export default function configureLibrary(){
    library.add(
        fas,
        fab
    );
}
