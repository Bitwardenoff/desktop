import { Component } from '@angular/core';
import {
    ActivatedRoute,
    Router,
} from '@angular/router';

import { ApiService } from 'jslib/abstractions/api.service';
import { CryptoService } from 'jslib/abstractions/crypto.service';
import { EnvironmentService } from 'jslib/abstractions/environment.service';
import { I18nService } from 'jslib/abstractions/i18n.service';
import { MessagingService } from 'jslib/abstractions/messaging.service';
import { PlatformUtilsService } from 'jslib/abstractions/platformUtils.service';
import { StateService } from 'jslib/abstractions/state.service';
import { StorageService } from 'jslib/abstractions/storage.service';
import { UserService } from 'jslib/abstractions/user.service';
import { VaultTimeoutService } from 'jslib/abstractions/vaultTimeout.service';

import { LockComponent as BaseLockComponent } from 'jslib/angular/components/lock.component';

@Component({
    selector: 'app-lock',
    templateUrl: 'lock.component.html',
})
export class LockComponent extends BaseLockComponent {
    constructor(router: Router, i18nService: I18nService,
        platformUtilsService: PlatformUtilsService, messagingService: MessagingService,
        userService: UserService, cryptoService: CryptoService,
        storageService: StorageService, vaultTimeoutService: VaultTimeoutService,
        environmentService: EnvironmentService, stateService: StateService,
        apiService: ApiService, private route: ActivatedRoute) {
        super(router, i18nService, platformUtilsService, messagingService, userService, cryptoService,
            storageService, vaultTimeoutService, environmentService, stateService, apiService);
    }

    async ngOnInit() {
        await super.ngOnInit();
        this.route.queryParams.subscribe((params) => {
            if (this.supportsBiometric && params.promptBiometric) {
                setTimeout(() => this.unlockBiometric(), 1000);
            }
        });
    }
}
