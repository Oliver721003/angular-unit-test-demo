import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { OrderService } from '../services/order.service';
import { OrderPageComponent } from './order-page.component';

describe('OrderPageComponent', () => {
  let loader: HarnessLoader;

  let component: OrderPageComponent;
  let fixture: ComponentFixture<OrderPageComponent>;

  // let orderService: OrderService;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    orderService = jasmine.createSpyObj<OrderService>(['compute']);
    orderService.compute.and.returnValue(900);

    await TestBed.configureTestingModule({
      imports: [FormsModule, MatButtonModule],
      declarations: [OrderPageComponent],
      providers: [{ provide: OrderService, useValue: orderService }],
      // providers: [OrderService],
    }).compileComponents();
  });

  beforeEach(() => createComponent());

  it('元件應可以被建立', () => expect(component).toBeTruthy());

  describe('頁面標題', () => {
    it('預設標題為 "訂單頁面"', () => {
      thenTitleShouldBe('訂單頁面');
    });

    it('當設定標題為 "購物車", 頁面標題應顯示為 "購物車"', () => {
      givenTitle('購物車');
      thenTitleShouldBe('購物車');
    });
  });

  it('當點選計算按鈕時, 應顯示總金額為 1000', async () => {
    givenUnitPrice(90);
    whenInputQuantity(10);
    await whenClickComputeButton();
    thenTotalShouldBe('900');
    // thenOrderServiceComputeShouldBeCalledWith(90, 10);
  });

  function createComponent() {
    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    // orderService = TestBed.inject(OrderService);
    // spyOn(orderService, 'compute').and.callThrough();
  }

  function givenTitle(title: string) {
    component.title = title;
    fixture.detectChanges();
  }

  function givenUnitPrice(unitPrice: number) {
    component.unitPrice = unitPrice;
    fixture.detectChanges();
  }

  async function getComputeButtonControl(): Promise<MatButtonHarness> {
    return await loader.getHarness(MatButtonHarness.with({ text: 'Compute' }));
  }

  function whenInputQuantity(value: number): void {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
  }

  async function whenClickComputeButton(): Promise<void> {
    const button = await getComputeButtonControl();
    await button.click();
  }

  function thenTitleShouldBe(expected: string) {
    const element = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(element.textContent).toBe(expected);
  }

  function thenTotalShouldBe(expected: string) {
    const element = fixture.debugElement.queryAll(By.css('div > span'))[1]
      .nativeElement;
    expect(element.textContent).toBe(expected);
  }

  function thenOrderServiceComputeShouldBeCalledWith(
    unitPrice: number,
    quantity: number
  ) {
    expect(orderService.compute).toHaveBeenCalledWith(unitPrice, quantity);
  }
});
