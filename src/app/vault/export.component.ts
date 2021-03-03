import {
    Component,
    NgZone,
    OnDestroy,
    OnInit,
} from '@angular/core';

import { CryptoService } from 'jslib/abstractions/crypto.service';
import { EventService } from 'jslib/abstractions/event.service';
import { ExportService } from 'jslib/abstractions/export.service';
import { I18nService } from 'jslib/abstractions/i18n.service';
import { PlatformUtilsService } from 'jslib/abstractions/platformUtils.service';

import { BroadcasterService } from 'jslib/angular/services/broadcaster.service';

import { ExportComponent as BaseExportComponent } from 'jslib/angular/components/export.component';

const BroadcasterSubscriptionId = 'ExportComponent';

@Component({
    selector: 'app-export',
    templateUrl: 'export.component.html',
})
export class ExportComponent extends BaseExportComponent implements OnInit {
    constructor(cryptoService: CryptoService, i18nService: I18nService,
        platformUtilsService: PlatformUtilsService, exportService: ExportService,
        eventService: EventService, private broadcasterService: BroadcasterService,
        private ngZone: NgZone) {
        super(cryptoService, i18nService, platformUtilsService, exportService, eventService, window);
    }

    async ngOnInit() {
        this.broadcasterService.subscribe(BroadcasterSubscriptionId, async (message: any) => {
            this.ngZone.run(() => {
                switch (message.command) {
                    case 'windowHidden':
                        this.onWindowHidden();
                        break;
                    default:
                }
            });
        });
    }

    ngOnDestroy() {
        this.broadcasterService.unsubscribe(BroadcasterSubscriptionId);
    }

    onWindowHidden() {
        this.showPassword = false;
    }
}
