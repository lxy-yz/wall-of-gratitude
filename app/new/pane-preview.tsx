import { Icons } from "@/components/icons";
import { FormField } from "@/components/ui/form";
import { Menubar, MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger } from "@/components/ui/menubar";
import { Colors, FontSize, Typeface } from "@/lib/validations";
import { useFormContext } from "react-hook-form";
import { GratitudeCard } from "../../components/gratitude-card";

export const PanePreview = () => {
  const form = useFormContext()
  const color = form.watch('bg')
  const typeface = form.watch('typeface')
  const fontSize = form.watch('fontSize')
  const to = form.watch('to')
  const content = form.watch('content')
  const tags = form.watch('tags')

  return (
    <div className="mx-auto w-[320px]">
      <GratitudeCard
        color={color}
        typeface={typeface}
        fontSize={fontSize}
        to={to}
        content={content}
        tags={tags.map(({ value }: { value: string }) => value)}
      />
      <Menubar className="mt-4 px-3 py-6">
        <MenubarMenu>
          <MenubarTrigger>
            <Icons.palette className='h-4 w-4' />
          </MenubarTrigger>
          <MenubarContent>
            <FormField
              control={form.control}
              name="bg"
              render={({ field }) => (
                <MenubarRadioGroup
                  // @ts-ignore
                  onValueChange={(value: Colors) => field.onChange(value)}
                  value={field.value}
                >
                  {Object.entries(Colors).map(([colorDisplay, colorValue]) => {
                    return (
                      <MenubarRadioItem
                        key={colorValue}
                        value={colorValue}
                        className={`text-${colorValue}-500`}>
                        {colorDisplay}
                      </MenubarRadioItem>
                    );
                  })}
                </MenubarRadioGroup>
              )}
            />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Icons.type className="h-4 w-4" />
          </MenubarTrigger>
          <MenubarContent>
            <FormField
              control={form.control}
              name="typeface"
              render={({ field }) => (
                <MenubarRadioGroup
                  // @ts-ignore
                  onValueChange={(value: Typeface) => field.onChange(value)}
                  value={field.value}
                >
                  {Object.entries(Typeface).map(([typefaceDisplay, typefaceValue]) => {
                    return (
                      <MenubarRadioItem
                        key={typefaceValue}
                        value={typefaceValue}
                        className={`font-${typefaceValue}`}>
                        {typefaceDisplay}
                      </MenubarRadioItem>
                    );
                  })}
                </MenubarRadioGroup>
              )}
            />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Icons.baseline className='h-4 w-4' />
          </MenubarTrigger>
          <MenubarContent>
            <FormField
              control={form.control}
              name="fontSize"
              render={({ field }) => (
                <MenubarRadioGroup
                  // @ts-ignore
                  onValueChange={(value: FontSize) => field.onChange(value)}
                  value={field.value}
                >
                  {Object.entries(FontSize).map(([fontDisplay, fontValue]) => {
                    return (
                      <MenubarRadioItem
                        key={fontValue}
                        value={fontValue}
                        className={`text-${fontValue}`}>
                        {fontDisplay}
                      </MenubarRadioItem>
                    );
                  })}
                </MenubarRadioGroup>
              )}
            />
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <div className="cursor-pointer px-3 py-2" onClick={() => form.setValue('content', '')}>
            <Icons.clear className="h-4 w-4" />
          </div>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}