<template>
	<main class="flex items-center justify-center min-h-screen h-full py-10">
		<section
			class="border flex flex-col gap-y-4 rounded-md p-5 max-w-screen-sm mx-auto w-10/12"
		>
			<h3 class="font-bold text-2xl text-center">Simulador de subsidio</h3>
			<small class="text-custom-primary text-center -mt-4"
				>Ten en cuenta que esta simulación solo aplica para proyectos
				<strong>VIP</strong> y <strong>VIS</strong>
			</small>
			<div class="flex flex-col gap-y-2">
				<strong>¿Valor del inmueble?</strong>
				<input
					type="number"
					min="0"
					max="200000000"
					placeholder="Ingresa el valor de tu inmueble"
					class="w-full"
					@blur="data.price > MAX_PRICE ? (data.price = MAX_PRICE) : 0"
					v-model="data.price"
				/>
			</div>
			<div class="flex flex-col gap-y-2">
				<strong>¿A que grupo de sisben perteneces?</strong>
				<select v-model="data.sisben">
					<option value="">Selecciona una opción</option>
					<option value="group-1">A1-C8</option>
					<option value="group-2">+C9</option>
					<option value="group-3">No tengo sisben</option>
				</select>
			</div>
			<div class="flex flex-col gap-y-2">
				<strong>¿Cuanto ganas?</strong>
				<div class="flex flex-col gap-y-2">
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="salary"
							value="group-1"
							v-model="data.salary"
						/>
						<span class="text-sm">0 a 2 SMMLV</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="salary"
							value="group-2"
							v-model="data.salary"
						/>
						<span class="text-sm">2 a 4 SMMLV</span>
					</label>
					<label class="flex items-center gap-2">
						<input
							type="radio"
							name="salary"
							value="group-3"
							v-model="data.salary"
						/>
						<span class="text-sm">+4 SMMLV</span>
					</label>
				</div>
			</div>
			<div class="flex flex-col gap-y-2">
				<h4 class="font-bold text-xl">Posible valor de tu vivienda</h4>
				<h3 class="font-bold text-2xl">
					{{ formatCurrency(newValue) }}
				</h3>
			</div>
			<div class="flex flex-col gap-y-2">
				<h5 class="font-bold">Aplican los subsidos de:</h5>
				<ul class="list-disc flex flex-col pl-6">
					<li class="text-sm" v-show="!concurrencia && miCasaYa">
						<strong>Mi casa ya:</strong> {{ miCasaYa }}
					</li>
					<li
						class="text-sm"
						v-show="!concurrencia && !miCasaYa && cajaDeCompensacion"
					>
						<strong>Caja de compensación:</strong> {{ cajaDeCompensacion }}
					</li>
					<li class="text-sm" v-show="concurrencia">
						<strong>Concurrencia:</strong> {{ concurrencia }}
					</li>
				</ul>
			</div>
			<p class="text-xs text-custom-primary font-light">
				Es importante que estos valores sean revisados y confirmados por tu
				constructora para asegurar que los subsidios mencionados sean
				aplicables. Ten en cuenta que no todas las constructoras gestionan o
				aplican todos los subsidios disponibles y que el valor del descuento
				puede cambiar.
			</p>
		</section>
	</main>
</template>

<script lang="ts" setup>
import { SMMLV_MOCK, SUBSIDIES_MOCK } from "@/constants/mocks";
import { formatCurrency } from "@/helpers/format";
import { computed, ref } from "vue";

const MAX_PRICE = 200000000;

const data = ref({
	price: 0,
	salary: "",
	sisben: "",
});

const miCasaYa = computed(() => {
	if (data.value.sisben == "group-1") {
		discount.value.miCasaYa = SUBSIDIES_MOCK.miCasaYa.group1 * SMMLV_MOCK;
		return `${formatCurrency(SUBSIDIES_MOCK.miCasaYa.group1 * SMMLV_MOCK)} o ${
			SUBSIDIES_MOCK.miCasaYa.group1
		} SMMLV`;
	}

	if (data.value.sisben == "group-2") {
		discount.value.miCasaYa = SUBSIDIES_MOCK.miCasaYa.group2 * SMMLV_MOCK;
		return `${formatCurrency(SUBSIDIES_MOCK.miCasaYa.group2 * SMMLV_MOCK)} o ${
			SUBSIDIES_MOCK.miCasaYa.group2
		} SMMLV`;
	}

	discount.value.miCasaYa = 0;

	return "";
});

const cajaDeCompensacion = computed(() => {
	if (
		data.value.salary == "group-1" &&
		(data.value.sisben == "group-3" || data.value.sisben == "")
	) {
		discount.value.cajaDeCompensacion =
			SUBSIDIES_MOCK.cajaDeCompensacion.group1 * SMMLV_MOCK;
		return `${formatCurrency(
			SUBSIDIES_MOCK.cajaDeCompensacion.group1 * SMMLV_MOCK
		)} o ${SUBSIDIES_MOCK.cajaDeCompensacion.group1} SMMLV`;
	}

	if (
		data.value.salary == "group-2" &&
		(data.value.sisben == "group-3" || data.value.sisben == "")
	) {
		discount.value.cajaDeCompensacion =
			SUBSIDIES_MOCK.cajaDeCompensacion.group2 * SMMLV_MOCK;
		return `${formatCurrency(
			SUBSIDIES_MOCK.cajaDeCompensacion.group2 * SMMLV_MOCK
		)} o ${SUBSIDIES_MOCK.cajaDeCompensacion.group2} SMMLV`;
	}

	discount.value.cajaDeCompensacion = 0;

	return "";
});

const concurrencia = computed(() => {
	if (data.value.salary == "group-1" && data.value.sisben == "group-1") {
		discount.value.concurrencia =
			SUBSIDIES_MOCK.concurrencia.group1 * SMMLV_MOCK;
		return `${formatCurrency(
			SUBSIDIES_MOCK.concurrencia.group1 * SMMLV_MOCK
		)} o ${SUBSIDIES_MOCK.concurrencia.group1} SMMLV`;
	}

	discount.value.concurrencia = 0;

	return "";
});

const discount = ref({
	miCasaYa: 0,
	cajaDeCompensacion: 0,
	concurrencia: 0,
});

const totalDiscount = computed(
	() =>
		discount.value.miCasaYa +
		discount.value.cajaDeCompensacion +
		discount.value.concurrencia
);

const newValue = computed(() => {
	if (totalDiscount.value > data.value.price) return 0;
	return data.value.price - totalDiscount.value;
});
</script>
